//
//  ArticleViewModel.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import Foundation
import Observation

@MainActor
@Observable
final class ArticleViewModel {

    private(set) var articles: [Article] = []
    private var apiClient: APIClientProtocol

    init(apiClient: APIClientProtocol? = nil) {
        self.apiClient = apiClient ?? APIClient()
    }

    func fetchArticles() {
        guard articles.isEmpty else {
            return
        }

        articles = apiClient.fetchArticles()
        print("[ArticleViewModel] Articles fetched: \(articles.count)")
    }

    func addNewArticle(article: Article) {
        articles.insert(article, at: 0)
        print("[ArticleViewModel] Articles added")
    }
}
