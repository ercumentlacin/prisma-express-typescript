export class HttpException extends Error {
    constructor(
        public message: string,
        public status: number,
        public details: unknown = {}
    ) {
        super(message);
    }
}
