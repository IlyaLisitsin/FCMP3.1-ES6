const newsCard = ({ author, title, publishedAt, name, description, url, urlToImage }) => `
     <a href="${url}" target="_blank">
        <div class="news-card">
            <div>
                <div class="news-image" style="background-image: url(${urlToImage})"></div>
            </div>
            <div>
                <div class="author medium-weight">${author}</div>
                <h4 class="title medium-weight">${title}</h4>
                <div class="publication-date bold-weight ">Publication date: <span class="regular-weight">${publishedAt}</span></div>
                <div class="description">${description}</div>
                <div class="source bold-weight ">Published by: <span class="regular-weight">${name}</span></div>
            </div>
        </div>
    </a>
`

export default newsCard