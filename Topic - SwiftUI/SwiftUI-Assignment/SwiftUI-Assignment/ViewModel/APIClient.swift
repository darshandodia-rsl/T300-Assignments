//
//  APIClient.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import Foundation

protocol APIClientProtocol {
    func fetchArticles() -> [Article]
}

struct APIClient: APIClientProtocol {

    func fetchArticles() -> [Article] {
        guard let url = Bundle.main.url(forResource: "articles", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let articles = try? JSONDecoder().decode([Article].self, from: data) else {
            return []
        }

        return articles
    }
}
