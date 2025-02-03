/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/receipts/process": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submits a receipt for processing.
         * @description Submits a receipt for processing.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: {
                content: {
                    "application/json": components["schemas"]["Receipt"];
                };
            };
            responses: {
                /** @description Returns the ID assigned to the receipt. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example adb6b560-0eef-42bc-9d16-df48f30e89b2 */
                            id: string;
                        };
                    };
                };
                400: components["responses"]["BadRequest"];
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/receipts/{id}/points": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Returns the points awarded for the receipt.
         * @description Returns the points awarded for the receipt.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description The ID of the receipt. */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description The number of points awarded. */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /**
                             * Format: int64
                             * @example 100
                             */
                            points?: number;
                        };
                    };
                };
                404: components["responses"]["NotFound"];
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Receipt: {
            /**
             * @description The name of the retailer or store the receipt is from.
             * @example M&M Corner Market
             */
            retailer: string;
            /**
             * Format: date
             * @description The date of the purchase printed on the receipt.
             * @example 2022-01-01
             */
            purchaseDate: string;
            /**
             * Format: time
             * @description The time of the purchase printed on the receipt. 24-hour time expected.
             * @example 13:01
             */
            purchaseTime: string;
            items: components["schemas"]["Item"][];
            /**
             * @description The total amount paid on the receipt.
             * @example 6.49
             */
            total: string;
        };
        Item: {
            /**
             * @description The Short Product Description for the item.
             * @example Mountain Dew 12PK
             */
            shortDescription: string;
            /**
             * @description The total price payed for this item.
             * @example 6.49
             */
            price: string;
        };
    };
    responses: {
        /** @description The receipt is invalid. */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
        /** @description No receipt found for that ID. */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content?: never;
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
