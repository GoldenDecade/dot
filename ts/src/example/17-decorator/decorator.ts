// 装饰器  decorator  (es7 提案 还在实验阶段, 生产环境避免使用)
// 用于类中
// 类装饰器    类中 方法装饰器  属性装饰器  参数装饰器

// 类装饰器: 多个装饰器 一起使用
/*desc = [readonly(false), log]
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);*/
