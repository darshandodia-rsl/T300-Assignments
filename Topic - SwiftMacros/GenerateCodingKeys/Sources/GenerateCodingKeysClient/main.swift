import Foundation
import GenerateCodingKeys

@GenerateCodingKeys
struct Article: Codable {
    let articleId: Int
    let articleTitle: String
    let authorName: String
    let publishedDate: String
}

@GenerateCodingKeys
struct Comment: Codable {
    let commentId: Int
    let articleId: Int
    let commenterName: String
    let createdAt: String
}

let article = Article(
    articleId: 1,
    articleTitle: "Learning Swift Macros",
    authorName: "Darshan",
    publishedDate: "2026-09-24"
)

let comment = Comment(
    commentId: 100,
    articleId: 1,
    commenterName: "Reader",
    createdAt: "2026-09-24"
)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

let articleData = try encoder.encode(article)
print("Article JSON:")
print(String(data: articleData, encoding: .utf8)!)

let commentData = try encoder.encode(comment)
print("\nComment JSON:")
print(String(data: commentData, encoding: .utf8)!)
