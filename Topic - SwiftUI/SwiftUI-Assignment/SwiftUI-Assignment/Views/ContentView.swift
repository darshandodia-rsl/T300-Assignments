//
//  ContentView.swift
//  SwiftUI-Assignment
//
//  Created by Darshan Dodia on 15/09/26.
//

import SwiftUI

struct ContentView: View {
    @State var viewModel = ArticleViewModel()
    @State var showAddArticleSheet: Bool = false

    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottomTrailing) {
                List(viewModel.articles) { article in
                    NavigationLink {
                        ArticleDetailView(article: article, viewModel: viewModel)
                    } label: {
                        ArticleCellView(article: article)
                    }
                }

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
            .navigationTitle("T300 - SwiftUI Blogs")
            .sheet(isPresented: $showAddArticleSheet) {
                AddArticleView(viewModel: viewModel)
            }
        }
        .task {
            viewModel.fetchArticles()
        }
    }
}

#Preview {
    ContentView()
}
