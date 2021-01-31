import { Request, Response } from "express"
import { Repository, FindManyOptions, In } from "typeorm";


export async function getList<T>(repo: Repository<T>, req: Request, res: Response, extraOptions?: FindManyOptions){
    try {
        //console.log("getList was called")
        const options:FindManyOptions={}
        if(req.query.sort){
            const [sortField="id", sortDirection="DESC"]=JSON.parse(req.query.sort as string);
            options.order={[sortField]: sortDirection}
        }
        if(req.query.range){
            const [first=0, last]=JSON.parse(req.query.range as string);
            options.skip=first;
            options.take=last - first;
        }
        if(req.query.filter && req.query.filter!=="{}"){
            try {
                /* TODO: fix this cancer inside Dataprovider */
                const parsedFilter=JSON.parse(req.query.filter as string);
                if(parsedFilter){
                    const filterOptions={}
                    Object.keys(parsedFilter).forEach(key=>{
                        const val=parsedFilter[key];
                        if(Array.isArray(val)){
                            if(val.length>1){
                                filterOptions[key]=In(parsedFilter[key])
                            }else if(val.length===1) {
                                filterOptions[key]=parsedFilter[key][0]
                            }
                        }else {
                            filterOptions[key]=parsedFilter[key]
                        }
                    })
                    options.where=filterOptions;
                    
                }
                //console.log("filter applied to getList");
            } catch (error) {
                console.log(error)
            }
            
        }
        await repo.findAndCount({where: {id: 1}})

        const [result, total] = await repo.findAndCount(extraOptions? {...options, ...extraOptions} : options)

        const first=options.skip || 0;
        const last=first + options.take;

        const resultCount=result.length;
        const realLastIndex = options.take ? Math.min(resultCount - 1 + first, last) : (resultCount - 1);

        
        res.set('Content-Range', `key ${first}-${realLastIndex}/${total}`)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: error.message
        })
    }
}

export default getList