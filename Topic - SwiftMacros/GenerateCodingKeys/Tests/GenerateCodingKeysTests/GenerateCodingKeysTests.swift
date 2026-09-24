import GenerateCodingKeysMacros

import SwiftSyntax
import SwiftSyntaxBuilder
import SwiftSyntaxMacros
import SwiftSyntaxMacrosTestSupport
import XCTest

final class GenerateCodingKeysTests: XCTestCase {

    // Checks that the Article struct expands correctly.
    func testArticleExpansion() throws {
        assertMacroExpansion(
            """
            @GenerateCodingKeys
            struct Article: Codable {
                let articleId: Int
                let articleTitle: String
                let authorName: String
                let publishedDate: String
            }
            """,
            expandedSource: """
            struct Article: Codable {
                let articleId: Int
                let articleTitle: String
                let authorName: String
                let publishedDate: String

                enum CodingKeys: String, CodingKey {
                    case articleId = "article_id"
                    case articleTitle = "article_title"
                    case authorName = "author_name"
                    case publishedDate = "published_date"
                }
            }
            """,
            macros: [
                "GenerateCodingKeys": GenerateCodingKeysMacro.self
            ]
        )
    }

    // Checks that the Comment struct expands correctly.
    func testCommentExpansion() throws {
        assertMacroExpansion(
            """
            @GenerateCodingKeys
            struct Comment: Codable {
                let commentId: Int
                let articleId: Int
                let commenterName: String
                let createdAt: String
            }
            """,
            expandedSource: """
            struct Comment: Codable {
                let commentId: Int
                let articleId: Int
                let commenterName: String
                let createdAt: String

                enum CodingKeys: String, CodingKey {
                    case commentId = "comment_id"
                    case articleId = "article_id"
                    case commenterName = "commenter_name"
                    case createdAt = "created_at"
                }
            }
            """,
            macros: [
                "GenerateCodingKeys": GenerateCodingKeysMacro.self
            ]
        )
    }
}
