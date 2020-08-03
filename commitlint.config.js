module.exports = {
    extends: ['@commitlint/config-conventional']
};


/**
 * <type>: <subject>
 * type commit 的类别，只允许使用下面7个标识
        feat：新功能（feature）
        fix：修补bug
        docs：文档（documentation）
        style： 格式方面的优化    
        refactor：重构
        test：测试
        chore：构建过程或辅助工具的变动

    subject commit 目的的简短描述，不能超过50个字符，且结尾不加英文句号
    如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。
    
    https://conventional-changelog.github.io/commitlint/#/
    https://conventional-changelog.github.io/commitlint/#/reference-rules
 */