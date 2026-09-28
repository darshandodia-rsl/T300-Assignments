import SwiftUI

struct BookDetailView: View {
    let bookID: Book.ID

    @Environment(Library.self) private var library
    @State private var isPresentingEdit = false

    private var book: Book? {
        library.books.first { $0.id == bookID }
    }

    var body: some View {
        Group {
            if let book {
                ScrollView {
                    VStack(alignment: .leading, spacing: 16) {
                        Image(systemName: book.coverSystemImage)
                            .font(.system(size: 72))
                            .foregroundStyle(.tint)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 32)
                            .background(.quaternary, in: RoundedRectangle(cornerRadius: 16))

                        VStack(alignment: .leading, spacing: 4) {
                            Text(book.title)
                                .font(.title)
                                .bold()
                            Text(book.author)
                                .font(.title3)
                                .foregroundStyle(.secondary)
                        }

                        Divider()

                        LabeledContent("Publication Year", value: String(book.publicationYear))
                        LabeledContent("Page Count", value: "\(book.pageCount) pages")
                        LabeledContent("Genre", value: book.genre.isEmpty ? "Unspecified" : book.genre)

                        VStack(alignment: .leading, spacing: 4) {
                            Text("Summary")
                                .font(.headline)
                            Text(book.summary.isEmpty ? "No summary yet." : book.summary)
                                .foregroundStyle(.secondary)
                        }
                        .padding(.top, 8)

                        // detailViewOpenCount is @ObservationIgnored, so this
                        // text will NOT update just because the count changed.
                        // It only shows the latest value when this screen is
                        // opened again, since that is what redraws this view.
                        Text("Viewed \(library.detailViewOpenCount) time(s)")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                            .padding(.top, 8)
                    }
                    .padding()
                }
                .navigationTitle(book.title)
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .primaryAction) {
                        Button("Edit") {
                            isPresentingEdit = true
                        }
                    }
                }
                .sheet(isPresented: $isPresentingEdit) {
                    EditBookView(bookID: book.id)
                }
                .onAppear {
                    // This counts as a "view" but does not redraw anything,
                    // since detailViewOpenCount is @ObservationIgnored.
                    library.recordDetailViewOpened()
                }
            } else {
                ContentUnavailableView("Book Not Found", systemImage: "book.closed")
            }
        }
    }
}

extension UUID: @retroactive Identifiable {
    public var id: Self { self }
}
