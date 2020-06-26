const { schema } = require('../../models/Article')

/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-25 14:01:27
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-26 22:09:13
 * @描述: 
 */
module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = require('../../models/Article')
    const Category = require('../../models/Category')
    //引用模型 Article ...
    // const Article = mongoose.model('Article')
    // const Category = mongoose.model('Category')

    // 临时接口 导入数据到后台
    router.get('/news/init', async (req, res) => {
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const newsTitles = ["集合，准备上船！——谁是峡谷最佳龙舟手？", "英雄调整情报丨貂蝉加强，赵云优化", "峡谷端午过节指南", "云中君源·梦皮肤海报投票结果公布", "UI改造日志丨局内外交流功能优化：观战中好友也可预约！", "6月25日峡谷龙舟赛挑战局数异常修复公告", "6月25日峡谷龙舟赛挑战局数异常说明", "6月25日体验服停机更新公告", "6月24日峡谷龙舟赛异常修复公告", "6月24日净化游戏环境声明及处罚公告", "荣耀中国节·峡谷龙舟赛，参与必得粽情泛舟回城特效（新）", "峡谷庆端午，好礼领不停", "恭喜TS夺得2020年KPL春季赛总冠军，多重福利来袭", "应援KPL春决得好礼，上官婉儿-天狼绘梦者即将开售", "【破浪前行吧英雄们】活动开启公告", "世冠小组赛抽签仪式6月28日现场直播，小组赛之战一触即发！", "2020年王者荣耀世界冠军杯（KCC）赛事规则", "无惧挑战向阳而生，TS冠军之夜今日18:00惊喜来袭", "虎牙明星主播踢馆名校战队，峡谷高材生与学霸的荣耀对决", "2020年KPL春季赛常规赛最佳阵容及最佳选手评选方式公布"]
        const newsList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })

    router.get('/news/list', async (req, res) => {
        //    const parent = await Category.findOne({
        //        name: '新闻分类'
        //    }).populate({
        //        path: 'children',
        //        populate: {
        //            path: 'newsList'
        //        }
        //    }).lean()
        const parent = await Category.findOne({
            name: '新闻分类'
        })
        // 聚合查询
        const cats = await Category.aggregate([
            { $match: { parent: parent._id } },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }

                }
            }
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(5).lean()
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })



        res.send(cats)
    })


    app.use('/web/api', router)
}