import SwiftUI

@main
struct LibraryObservationApp: App {
    // @State here means the app owns the Library model and keeps it
    // alive for as long as the app is running.
    @State private var library = Library()

    var body: some Scene {
        WindowGroup {
            LibraryHomeView()
                // Puts library into the environment so any child view can
                // read it with @Environment(Library.self).
                .environment(library)
        }
    }
}
