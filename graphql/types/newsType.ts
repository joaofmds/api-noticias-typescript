export default
`
scalar Date

type Query {
    newsList: [news]
    newsGetById(id: String): News
}

type Mutation {
    addNews(input: NewsInput): News
    updateNews(id: String, input: NewsInput): News
    deleteNews(id: String): News
}

type News {
    _id: String,
    hat: String,
    title: String,
    author: String,
    img: String,
    publishDate: Date,
    link: String,
    tag: String,
    active: Boolean
}

input NewsInput {
    _id: String,
    hat: String,
    title: String,
    author: String,
    img: String,
    publishDate: Date,
    link: String,
    tag: String,
    active: Boolean
}

`