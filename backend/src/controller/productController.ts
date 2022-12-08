import { NextFunction, Request, Response } from "express"
import {Product} from "../model/product";
import {Controller} from "./controller";
import {validateProduct} from "../middleware/validate";

export class ProductController extends Controller {

    constructor() {
        super(Product);
    }

    async getAllProducts(request: Request, response: Response, next: NextFunction) {
        this.repository.find({
            relations: {
                categories: true,
            }
        }).then(result => {
            return response.status(201).json(result);
        })
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({
            id: request.params.id,
            relations: {
                categories: true,
            }
        }).then(y => {
            return response.status(200).json(y);
        })
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        if (!validateProduct(request.body)) {
            next()
        } else {
            await this.repository.save(request.body).then(product => {
                return response.status(200).json(product);
            })
        }
    }

    async editProduct(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            return response.status(200).json(y);
        })
    }

    async addCategoryToProduct(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            return response.status(200).json(y);
        })
    }

    async removeCategoryFromProduct(request: Request, response: Response, next: NextFunction) {//TODO: by ID!
        this.repository.save(request.body).then(y => {
            return response.status(200).json(y);
        })
    }

    async removeProduct(request: Request, response: Response, next: NextFunction) {
        this.repository.findOneBy({ id: request.params.id }).then(async y => {
            await this.repository.remove(y)
            return response.status(200).json(y);
        })
    }

}