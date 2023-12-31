import NewsService from "../services/newsService";
import * as HttpStatus from 'http-status';
import * as redis from 'redis';
import Helper from "../infra/helper";
import exportFiles from "../infra/exportFiles";

class NewsController {
    async get(req, res) {
        try {
            let client = redis.createClient(6379, 'redis');

            await client.get("news", async function (err:, reply) {
                if (reply) {
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                } else {
                    let result = await NewsService.get();
                    client.set('news', JSON.stringify(result));
                    client.expire('news', 20);
                    Helper.sendResponse(res, HttpStatus.OK, result);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }


    async getById(req, res) {
        try {
            const _id = req.params.id;

            let result = await NewsService.getById(_id)
            Helper.sendResponse(res, HttpStatus.OK, result);
        } catch (error) {
            console.error(error);
        }
    };

    async exportToCsv(req, res) {
        try {
            let response = await NewsService.get();
            let fileName = exportFiles.tocsv(response);
            Helper.sendResponse(res, HttpStatus.OK, req.get('host') + '/exports/' + fileName);
        } catch (error) {
            console.error(error);
        }
    }

    async create(req, res) {
        try {
            let vm = req.body;

            await NewsService.create(vm)
            Helper.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso.")
        } catch(error) {
        console.error(error);
        }
    }

    async update(req, res) {
        try {
            const _id = req.params.id;
            let news = req.body;
            await NewsService.update(_id, news)
            Helper.sendResponse(res, HttpStatus.OK, `${news.title} atualizada com sucesso.`)
        } catch (error) {
            console.error(error);
        }
    };

    async delete(req, res) {
        try {
            const _id = req.params.id;
            await NewsService.delete(_id)
            Helper.sendResponse(res, HttpStatus.OK, `Notícia deletada com sucesso.`)
        } catch (error) {
            console.error(error);
        }
    };
};

export default new NewsController();