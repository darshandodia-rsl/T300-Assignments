//
//  ArticleDetailView.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import SwiftUI

struct ArticleDetailView: View {
    let article: Article
    var viewModel: ArticleViewModel
    @State private var showAddArticleSheet: Bool = false

    var body: some View {
        ZStack(alignment: .bottomTrailing) {
            ScrollView {
                VStack(alignment: .leading, spacing: 16) {
                    if let imageURL = article.imageURL {
                        AsyncImage(url: imageURL) { image in
                            image
                                .resizable()
                                .scaledToFill()
                        } placeholder: {
                            ProgressView()
                        }
                        .frame(maxWidth: .infinity)
                        .frame(height: 220)
                        .cornerRadius(12)
                        .clipped()
                    } else {
                        Image(systemName: "newspaper.fill")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 40, height: 40)
                            .frame(maxWidth: .infinity)
                            .frame(height: 180)
                            .background(Color(.systemGray5))
                            .foregroundColor(.gray)
                            .cornerRadius(12)
                    }

                    Text(article.title)
                        .font(.title)
                        .fontWeight(.bold)

                    Text("Written by: \(article.author) • \(article.date)")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    Divider()

                    Text(article.body)
                        .font(.body)
                        .lineSpacing(6)
                }
                .padding()
            }

            // Floating Action Button
            Button {
                showAddArticleSheet = true
            } label: {
                Image(systemName: "plus")
                    .font(.title2.bold())
                    .foregroundColor(.white)
                    .frame(width: 56, height: 56)
                    .background(Color.blue)
                    .clipShape(Circle())
                    .shadow(color: Color.black.opacity(0.3), radius: 4, x: 0, y: 2)
            }
            .padding(20)
        }
        .navigationTitle(article.title)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showAddArticleSheet) {
            AddArticleView(viewModel: viewModel)
        }
    }
}

#Preview {
    ArticleDetailView(article: Article(
        id: 1,
        title: "Learn SwiftUI",
        body: "SwiftUI is Apple's modern declarative framework for building user interfaces across all Apple platforms with the power of Swift. In SwiftUI, you describe what your user interface should look like for a given state.",
        imageURL: URL(string: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"),
        author: "Darshan Dodia",
        date: "2026-09-15"
    ),
    viewModel: ArticleViewModel())
}
