import SwiftUI

/// Shared form fields for both Add and Edit. Takes a `Binding<Book>` so the
/// caller decides where that binding points
struct BookFormFields: View {
    @Binding var book: Book

    var body: some View {
        Section("Basic Info") {
            TextField("Title", text: $book.title)
            TextField("Author", text: $book.author)
            Stepper("Year: \(book.publicationYear)", value: $book.publicationYear, in: 1000...2100)
        }
        Section("Details") {
            TextField("Genre", text: $book.genre)
            Stepper("Pages: \(book.pageCount)", value: $book.pageCount, in: 1...5000, step: 10)
            TextField("Cover Symbol (SF Symbol name)", text: $book.coverSystemImage)
        }
        Section("Summary") {
            TextEditor(text: $book.summary)
                .frame(minHeight: 100)
        }
    }
}
