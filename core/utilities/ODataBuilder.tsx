import { Constants } from "../datasets/Constants";
export default class OdataBuilder {
    baseUrl: string;
    top?: string;
    skip?: string;
    filterBy?: string;
    orderBy?: string;
    keyword?: string

    constructor(url: string) {
        this.baseUrl = url;
        this.top = Constants.pagesize.toString();
        this.skip = "0";
        this.keyword = "";
        this.filterBy = "";
        this.orderBy = "";

    }

    // parseSearchParams(ReadonlyUrlSearchParams): DataQuery {
    //     this.top = top;
    //     return this;
    //   }
    setQuery(odata?: { [key: string]: string }): OdataBuilder {
        if (odata) {
            for (const key in odata) {
                if (odata[key] != null && odata[key] != "") {
                    if (key == "$skip") {
                        this.setSkip(odata[key]);
                    }
                    if (key == "$filter") {
                        this.setFilter(odata[key]);
                    }
                    if (key == "$top") {
                        this.setTop(odata[key]);
                    }
                    if (key == "$orderby") {
                        this.setOrderBy(odata[key]);
                    }
                }
            }
        }
        return this;
    }

    // parseKeyValuePairs(inputString: string): { [key: string]: string } {
    //     return inputString.split('$')
    //         .map((pair) => pair.split('='))
    //         .reduce((result: { [key: string]: string }, [key, value]) => {
    //             if (key && value) {
    //                 result[key.trim()] = value.trim();
    //             }
    //             return result;
    //         }, {});
    // }


    static getOdataQueryString(obj?: { [key: string]: string }, defaultOrder?: string): string {
        let queryString = '';

        //let skip = obj["$skip"] ? obj["$skip"] : "0";
        let skip = (obj && obj["$skip"]) ?? "0";


        let top = (obj && obj["$top"]) ?? Constants.pagesize.toString();

        queryString = `$skip=${skip}&$top=${top}&$count=true`;
        if (obj) {
            if (obj["$filter"] && obj["$filter"] !== null && obj["$filter"] !== "") {
                queryString = queryString + `&$filter=${encodeURIComponent(obj["$filter"])}`;
            }
            if (obj["$orderby"] && obj["$orderby"] !== null && obj["$orderby"] !== "") {
                queryString = queryString + `&$orderby=${encodeURIComponent(obj["$orderby"])}`;
            }
            else if (defaultOrder) {
                queryString = queryString + `&$orderby=${encodeURIComponent(defaultOrder)}`;
            }
        }
        else
        {
            if (defaultOrder) {
                queryString = queryString + `&$orderby=${encodeURIComponent(defaultOrder)}`;
            }
        }
        return queryString;
    }

    setTop(top: string): OdataBuilder {
        this.top = top;
        return this;
    }

    setSkip(skip: string): OdataBuilder {
        this.skip = skip;
        return this;
    }

    setKeyword(keyword: string): OdataBuilder {
        this.keyword = keyword;
        return this;
    }

    setFilter(filterBy: string): OdataBuilder {
        this.filterBy = filterBy;
        return this;
    }

    setOrderBy(orderBy: string): OdataBuilder {
        this.orderBy = orderBy;
        return this;
    }

    getPageNumber(pageSize: number): number {
        let pageNumber = 1;
        if (this.skip && this.top) {
            const skip = parseInt(this.skip);
            const top = parseInt(this.top);
            if (!isNaN(skip) && !isNaN(top)) {
                pageNumber = ((skip) / pageSize + 1)
            }
        }


        return pageNumber;
    }

    getUrl(): string {
        let url = `${this.baseUrl}?$skip=${this.skip}&$top=${this.top}&$count=true`;
        if (this.filterBy !== null && this.filterBy !== "") {
            url = url + `&$filter=${encodeURIComponent(this.filterBy!)}`;
        }
        if (this.orderBy !== null && this.orderBy !== "") {
            url = url + `&$orderby=${encodeURIComponent(this.orderBy!)}`;
        }
        console.log(url);
        return url;
    }



    getNewOrderByUrl(orderBy: string): string {
        let url = `${this.baseUrl}?$skip=${0}&$top=${this.top}&$count=true`; //setting skip as 0.
        if (this.filterBy !== null && this.filterBy !== "") {
            url = url + `&$filter=${encodeURIComponent(this.filterBy!)}`;
        }
        url = url + `&$orderby=${encodeURIComponent(orderBy)}`;
        //console.log(url);
        return url;
    }

    getNewFilterUrl(filterBy: string): string {
        let url = `${this.baseUrl}?$skip=${0}&$top=${this.top}&$count=true`; //setting skip as 0.
        if (filterBy !== null && filterBy !== "") {
            url = url + `&$filter=${encodeURIComponent(filterBy!)}`;
        }
        if (this.orderBy !== null && this.orderBy !== "") {
            url = url + `&$orderby=${encodeURIComponent(this.orderBy!)}`;
        }
        return url;
    }

    getNewPageUrl(page: number): string {
        let skip = page * Constants.pagesize - Constants.pagesize;
        let url = `${this.baseUrl}?$skip=${skip}&$top=${this.top}&$count=true`; //setting skip as 0.
        if (this.filterBy !== null && this.filterBy !== "") {
            url = url + `&$filter=${encodeURIComponent(this.filterBy!)}`;
        }
        if (this.orderBy !== null && this.orderBy !== "") {
            url = url + `&$orderby=${encodeURIComponent(this.orderBy!)}`;
        }
        //console.log(url);
        return url;
    }

    getOrderBy(): string {
        return this.orderBy!;
    }



}
