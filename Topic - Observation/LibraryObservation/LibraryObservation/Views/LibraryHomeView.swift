import SwiftUI

struct LibraryHomeView: View {
    @Environment(Library.self) private var library

    @State private var isPresentingAddBook = false
    @State private var editingBookID: Book.ID?

    var body: some View {
        NavigationStack {
            List {
                Section(footer: TotalBooksAddedView()) {
                    ForEach(library.books) { book in
                        NavigationLink(value: book.id) {
                            BookRowView(book: book)
                        }
                        .swipeActions(edge: .trailing) {
                            Button("Edit") {
                                editingBookID = book.id
                            }
                            .tint(.blue)
                        }
                    }
                    .onDelete(perform: library.deleteBooks)
                }
            }
            .navigationTitle("Library")
            .navigationDestination(for: Book.ID.self) { bookID in
                BookDetailView(bookID: bookID)
            }
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        isPresentingAddBook = true
                    } label: {
                        Label("Add Book", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $isPresentingAddBook) {
                AddBookView()
            }
            .sheet(item: $editingBookID) { bookID in
                EditBookView(bookID: bookID)
            }
        }
    }
}

#Preview {
    LibraryHomeView()
        .environment(Library())
}
