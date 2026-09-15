//
//  ArticleCellView.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import SwiftUI

struct ArticleCellView: View {
    let article: Article

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            if let imageURL = article.imageURL {
                AsyncImage(url: imageURL) { image in
                    image
                        .resizable()
                        .scaledToFill()
                } placeholder: {
                    ProgressView()
                }
                .frame(width: 60, height: 60)
                .cornerRadius(8)
                .clipped()
            } else {
                Image(systemName: "newspaper.fill")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 30, height: 30)
                    .frame(width: 60, height: 60)
                    .background(Color(.systemGray5))
                    .foregroundColor(.gray)
                    .cornerRadius(8)
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(article.title)
                    .font(.headline)
                    .lineLimit(2)

                Text(article.body)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
            }
        }
        .padding(.vertical, 4)
    }
}

#Preview {
    ArticleCellView(article: Article(
        id: 1,
        title: "Learn SwiftUI",
        body: "SwiftUI is Apple's modern declarative framework for building user interfaces across all Apple platforms with the power of Swift. In SwiftUI, you describe what your user interface should look like for a given state.",
        imageURL: URL(string: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"),
        author: "Darshan Dodia",
        date: "2026-09-15"
    ))
}
