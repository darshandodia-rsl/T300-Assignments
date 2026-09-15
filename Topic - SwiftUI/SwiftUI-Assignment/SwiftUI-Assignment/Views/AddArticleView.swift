//
//  AddArticleView.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import SwiftUI

struct AddArticleView: View {
    @Environment(\.dismiss) private var dismiss

    @State private var articleTitle: String = ""
    @State private var articleBody: String = ""

    let viewModel: ArticleViewModel

    private var isArticleValid: Bool {
         !articleTitle.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
         !articleBody.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
     }

    var body: some View {
        VStack(spacing: 16) {
            Text("Create Post")
                .font(.title2)
                .fontWeight(.bold)
                .padding(.top, 8)

            TextField("Add a title to your post", text: $articleTitle)
                .modifier(BlueBorderModifier())

            TextEditor(text: $articleBody)
                .scrollContentBackground(.hidden)
                .frame(maxHeight: .infinity)
                .modifier(BlueBorderModifier())

            Button("Create Post") {
                saveArticle()
            }
            .font(.headline)
            .disabled(!isArticleValid)
            .foregroundColor(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(isArticleValid ? Color.blue : Color.gray)
            .cornerRadius(10)
            .padding(.bottom, 8)
        }
        .padding(.horizontal)
    }

    private func saveArticle() {
        let dateString = Date.now.formatted(.iso8601.year().month().day().dateSeparator(.dash))
        let newArticle = Article(
            id: viewModel.articles.count + 1,
            title: articleTitle,
            body: articleBody,
            imageURL: nil,
            author: "Anonymous",
            date: dateString
        )

        viewModel.addNewArticle(article: newArticle)
        dismiss()
    }
}

struct BlueBorderModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color.blue, lineWidth: 2)
            )
    }
}

#Preview {
    AddArticleView(viewModel: ArticleViewModel())
}
