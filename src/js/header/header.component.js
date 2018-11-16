import NewsCard from 'news-card'
import headerTpl from './header.tpl'
import newsCard from "js/news-card/news-card.tpl";

export default class Header {
    constructor() {
        this.headerDomModel = null;
        this.elementsMap = {};
        this.API_KEY = '1bc861fb73d04d3f99db4a2166654179';
        this.ENDPOINT = 'https://newsapi.org/v2/everything';
        this.BLANK_IMAGE_URL = 'https://cryptonews.com.hk/wp-content/uploads/2017/04/news-icon-1.png';
    }

    bindElements() {
        const globalHeaderScope = this;

        this.elementsMap.filtersButton = {
            element: this.headerDomModel.querySelector('#filters-button'),
            event: 'click',
            callback: this.toggleFilterPanel.bind(globalHeaderScope)
        };

        this.elementsMap.searchButton = {
            element: this.headerDomModel.querySelector('#search-button'),
            event: 'click',
            callback: this.fetchNews.bind(globalHeaderScope)
        };
    }

    toggleFilterPanel() {
        this.headerDomModel.querySelector('.header-filters').classList.toggle('show-filters');
        this.headerDomModel.querySelector('#filters-button').classList.toggle('active-filters-btn');
    }

    fetchNews() {
        const textQuery = this.headerDomModel.querySelector('#header-input').value || 'news';
        const languageQuery = this.headerDomModel.querySelector('input[name="language"]:checked').value || 'en';
        const sourcesQuery = this.headerDomModel.querySelector('input[name="sources"]:checked').value || 'google-news';
        const url = `${this.ENDPOINT}?q=${textQuery}&language=${languageQuery}&sources=${sourcesQuery}&pageSize=10&apiKey=${this.API_KEY}`;

        const req = new Request(url)

        document.querySelector('.spinner').classList.remove('hide')
        document.querySelector('.no-results-caption').classList.add('hide')
        fetch(req).then(res => res.json()).then(({ articles }) => {
            document.querySelector('.spinner').classList.toggle('hide')
            this.renderCardList(articles)
        })
    }

    renderCardList(articlesCollection) {
        const newsListSection = document.querySelector('.news-list')
        newsListSection.innerHTML = ''

        if (!articlesCollection.length) {
            document.querySelector('.no-results-caption').classList.remove('hide')
            return
        }

        document.querySelector('.no-results-caption').classList.add('hide')
        articlesCollection.map(({ author, title, publishedAt, source: { name }, description, url, urlToImage }) =>
            newsListSection.innerHTML += NewsCard({
                author: author || '',
                title: title || '',
                publishedAt: this.extractDate(publishedAt) || '',
                name: name || '',
                description: description || '',
                url: url || '',
                urlToImage: urlToImage || this.BLANK_IMAGE_URL
            }))
    }

    extractDate(dateStr) {
        if (dateStr) return new Date(dateStr).toLocaleDateString().replace(/\//g, '-')
        return false
    }

    bindEventListeners() {
        Object.keys(this.elementsMap).map(domElKey =>
            this.elementsMap[domElKey].element.addEventListener(
                this.elementsMap[domElKey].event,
                this.elementsMap[domElKey].callback
            ))
    }

    create() {
        this.headerDomModel = document.createElement('div');
        this.headerDomModel.innerHTML = headerTpl();
        this.bindElements();
        this.bindEventListeners();

        document.querySelector('header').appendChild(this.headerDomModel);
    }
}
