import SwiftUI

// This view only reads `library.totalBooksAdded`, not `library.books`.
// Because @Observable tracks each property on its own, this view redraws
// only when a book is added. Editing or deleting a book does not affect it.
struct TotalBooksAddedView: View {
    @Environment(Library.self) private var library

    var body: some View {
        Text("Total books added: \(library.totalBooksAdded)")
            .font(.footnote)
            .foregroundStyle(.secondary)
    }
}
