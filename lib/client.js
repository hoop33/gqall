const { GraphQLClient } = require("graphql-request");
const queries = require("./queries");

class Client {
    
    constructor(url, query) {
        this.url = url;
        this.query = query;       
    }
    
    setVerbose(verbose) {
        this.verbose = verbose;
    };

    addHeader(header) {
        if (header) {
            let parts = header.split(":", 2);
            if (parts.length !== 2) {
                throw "header not valid: " + header;
            }

            this.headers = this.headers || {};
            this.headers[parts[0]] = parts[1];
        } else {
            throw "header not valid";
        }
    }

    async run() {
        this._log(`url: ${this.url}`);
        this._log(`query: ${this.query}`);

        const gqClient = new GraphQLClient(this.url, {
            headers: this.headers
        });

        const data = await this._runQuery(gqClient, queries.schemaQuery);
        const schema = data ? data.__schema : undefined;
        if (!schema) throw "can't get schema";

        const queryTypeName = schema.queryType.name;
        if (!queryTypeName) throw "can't get query type name";
        this._log(`query type name: ${queryTypeName}`);

        const queryType = this._findTypeByName(schema.types, queryTypeName);
        if (!queryType) throw "can't get query type";

        const rqQueryName = this._parseQueryName();
        this._log(`query name: ${rqQueryName}`);

        const queryObject = this._findTypeByName(queryType.fields, rqQueryName);
        if (!queryObject) throw `can't find query ${rqQueryName}`;

        const responseType = this._findResponseType(queryObject.type);
        if (!responseType) throw `can't find response type for query ${rqQueryName}`;
        this._log(`response type: ${responseType}`);

        const responseObject = this._findTypeByName(schema.types, responseType);
        if (!responseObject) throw `can't find response for type ${responseType}`;
        this._log(`response description: ${responseObject.description}`);

        const q = this._buildQuery(schema, responseObject);
        if (!q) throw `can't build query for ${rqQueryName}`;
        this._log(`query: ${q}`);

        const response = await this._runQuery(gqClient, q);
        if (!response) throw `no response from query ${rqQueryName})`;
        return response;
    };

    _findTypeByName(types, name) {
        if (types) {
            const found = types.filter(type => {
                return type.name === name;
            });
            return found.length === 1 ? found[0] : undefined;
        }
    };

    _findResponseType(type) {
        if (type) {
            if (type.name) return type.name;
            if (type.ofType) return this._findResponseType(type.ofType);
        }
    };

    _findResponseKind(type) {
        if (type) {
            if (type.kind && type.kind !== "NON_NULL") return type.kind;
            if (type.ofType) return this._findResponseKind(type.ofType);
        }
    };

    _buildQuery(schema, type) {
        return `query { ${this.query} ${this._buildFields(schema, type)}}`;
    };

    _buildFields(schema, type) {
        let q = "";
        if (type.fields) {
            q += "{ ";
            type.fields.forEach(field => {
                q += `${field.name} `;
                const kind = this._findResponseKind(field.type);
                switch (kind) {
                    case "LIST":
                    case "OBJECT":
                        const lName = this._findResponseType(field.type);
                        const lType = this._findTypeByName(schema.types, lName);
                        q += this._buildFields(schema, lType);
                        break;
                    default:
                }
            });
            q += "} ";
        }
        return q;
    };

    async _runQuery(gqClient, query) {
        this._log("running query");
        const data = await gqClient.request(query);
        return data;
    };

    _parseQueryName() {
        return this.query.split("(", 1)[0];
    };

    _log(msg) {
        if (this.verbose) {
            console.log(msg);
        }
    };
}

module.exports = Client;
