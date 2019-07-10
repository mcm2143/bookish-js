import {IMain, IDatabase} from 'pg-promise';
import pgPromise from 'pg-promise';
import Book from './Book';

export default class Queries {
    db: IDatabase<any>;

    constructor(db) {
        this.db = db;
    }

    makeQuery = async (queryString, singleItem = false) => {
        try {
            let data : any;
            if (singleItem) {
                data = await this.db.one(queryString);
            } else {
                data = await this.db.any(queryString);
            }
            return data;
        
        } catch (e) {
            console.log(`====${queryString}===`);
            console.log(e);
        }
    }

    awaitQuery = async (queryString, singleItem = false) => {
        const result : any = await this.makeQuery(queryString, singleItem);
        console.log(result);
        return result;
    }

    makeSelectString(table, value, condition) {
        const queryString: string = `SELECT ${value} FROM ${table} WHERE ${condition};`;
        return queryString;
    }

    
}