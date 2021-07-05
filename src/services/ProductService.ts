import { injectable, inject } from "inversify";
import { AppError } from "@/ErrorHandler/AppError";
import ProductSchema from "@/entity/Product";

@injectable()
export class ProductServiceImpl implements ProductService {
    public async create(config) {
        const { _id, ...rest } = config;

        try {
            const configuration = new ProductSchema();
            Object.assign(configuration, rest);

            return await configuration.save();
        } catch (error) {
            throw new AppError(error, 400);
        }
    }

    public async update(id, config) {
        const { _id, ...rest } = config;
        try {
            const saved = await ProductSchema.findByIdAndUpdate(id, rest, {
                new: true,
            });

            return saved;
        } catch (error) {
            throw new AppError(error, 400);
        }
    }

    public async delete(_id) {
        try {
            const saved = await ProductSchema.remove({ _id });

            return saved;
        } catch (error) {
            throw new AppError(error, 400);
        }
    }


    public async getByID(id) {
        try {
            const product = await ProductSchema.findById(id).lean();
            return await product;
        } catch (error) {
            throw new AppError("Error finding product", 400);
        }
    }

    public async getAll() {
        try {
            const products = await ProductSchema.find().lean();
            return await products;
        } catch (error) {
            throw new AppError("Error finding products", 400);
        }
    }

}

export interface ProductService {
    create(config): Promise<any>;
    delete(id): Promise<any>;
    update(id, config): Promise<any>;
    getByID(id): Promise<any>;
    getAll(): Promise<any>;
}
