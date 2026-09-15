//
//  Article.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import Foundation

struct Article: Codable, Identifiable {
    let id: Int
    let title: String
    let body: String
    let imageURL: URL?
    let author: String
    let date: String
}
