import Foundation

/// A single book in the library. Plain value type - no observation needed here,
/// since Observation tracking applies to the `Library` reference type that owns these.
struct Book: Identifiable, Equatable {
    let id: UUID
    var title: String
    var author: String
    var publicationYear: Int
    var pageCount: Int
    var genre: String
    var summary: String
    var coverSystemImage: String

    init(
        id: UUID = UUID(),
        title: String,
        author: String,
        publicationYear: Int,
        pageCount: Int,
        genre: String,
        summary: String,
        coverSystemImage: String = "book.closed"
    ) {
        self.id = id
        self.title = title
        self.author = author
        self.publicationYear = publicationYear
        self.pageCount = pageCount
        self.genre = genre
        self.summary = summary
        self.coverSystemImage = coverSystemImage
    }

    /// Starting point for the "Add Book" screen.
    static var blank: Book {
        Book(
            title: "",
            author: "",
            publicationYear: Calendar.current.component(.year, from: .now),
            pageCount: 200,
            genre: "",
            summary: "",
            coverSystemImage: "book.closed"
        )
    }
}
