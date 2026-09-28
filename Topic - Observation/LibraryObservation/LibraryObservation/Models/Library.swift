import Foundation
import Observation

@Observable
final class Library {
    var books: [Book]

    // Extra property that is NOT shown on the list, detail, or edit screens.
    // It only goes up when a book is added. Used to show property-level
    // tracking: a view that reads only this will not redraw when a book
    // is edited or deleted.
    var totalBooksAdded: Int = 0

    // @ObservationIgnored means SwiftUI does not track this property.
    // Changing it will never cause a view to redraw by itself.
    @ObservationIgnored var detailViewOpenCount: Int = 0

    init(books: [Book] = Library.sampleBooks) {
        self.books = books
        trackBookListChanges()
    }

    func addBook(_ book: Book) {
        books.append(book)
        totalBooksAdded += 1
    }

    func updateBook(_ book: Book) {
        guard let index = books.firstIndex(where: { $0.id == book.id }) else { return }
        books[index] = book
    }

    func deleteBooks(at offsets: IndexSet) {
        books.remove(atOffsets: offsets)
    }

    // Called when the detail screen appears. Because the property is
    // @ObservationIgnored, this does not refresh any view.
    func recordDetailViewOpened() {
        detailViewOpenCount += 1
    }

    // Manually watches the `books` array using withObservationTracking.
    // It only fires once per call, so we call it again inside onChange
    // to keep watching.
    private func trackBookListChanges() {
        withObservationTracking {
            _ = books.count
        } onChange: { [weak self] in
            print("withObservationTracking: books list changed")
            Task { @MainActor in
                self?.trackBookListChanges()
            }
        }
    }

    static let sampleBooks: [Book] = [
        Book(
            title: "The Pragmatic Programmer",
            author: "David Thomas & Andrew Hunt",
            publicationYear: 1999,
            pageCount: 352,
            genre: "Software Engineering",
            summary: "A catalog of practical tips and philosophies for becoming a more effective, adaptable software developer.",
            coverSystemImage: "hammer.circle.fill"
        ),
        Book(
            title: "Dune",
            author: "Frank Herbert",
            publicationYear: 1965,
            pageCount: 412,
            genre: "Science Fiction",
            summary: "On the desert planet Arrakis, a young heir becomes entangled in a struggle for control of the universe's most valuable resource.",
            coverSystemImage: "sun.max.circle.fill"
        ),
        Book(
            title: "Educated",
            author: "Tara Westover",
            publicationYear: 2018,
            pageCount: 334,
            genre: "Memoir",
            summary: "A memoir about a woman who grows up in a survivalist family in rural Idaho and eventually earns a PhD from Cambridge.",
            coverSystemImage: "graduationcap.circle.fill"
        ),
        Book(
            title: "Atomic Habits",
            author: "James Clear",
            publicationYear: 2018,
            pageCount: 320,
            genre: "Self-Help",
            summary: "A practical guide to building good habits and breaking bad ones through small, consistent changes.",
            coverSystemImage: "sparkles.circle.fill"
        ),
        Book(
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            publicationYear: 1937,
            pageCount: 310,
            genre: "Fantasy",
            summary: "A reluctant hobbit sets out on an unexpected journey to help a group of dwarves reclaim their mountain home from a dragon.",
            coverSystemImage: "mountain.2.circle.fill"
        ),
        Book(
            title: "Sapiens",
            author: "Yuval Noah Harari",
            publicationYear: 2011,
            pageCount: 443,
            genre: "History",
            summary: "A sweeping look at how Homo sapiens came to dominate the planet, from the Cognitive Revolution to the present day.",
            coverSystemImage: "globe.americas.fill"
        )
    ]
}
