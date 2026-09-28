import SwiftUI

// Take library from environment and wrap it again with @Bindable so a TextField
// can bind straight to $library.books[index].
struct EditBookView: View {
    let bookID: Book.ID

    @Environment(Library.self) private var library
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        @Bindable var library = library

        NavigationStack {
            Form {
                if let index = library.books.firstIndex(where: { $0.id == bookID }) {
                    BookFormFields(book: $library.books[index])
                } else {
                    Text("This book no longer exists.")
                }
            }
            .navigationTitle("Edit Book")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}
