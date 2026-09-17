import SwiftUI
import SwiftData

@main
struct SwiftDataStarterAppApp: App {
    // Task 3 solution: ModelContainer initialized at the root of the App Shell.
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([User.self, UserTask.self])
        let configuration = ModelConfiguration(schema: schema)
        do {
            let container = try ModelContainer(for: schema, configurations: [configuration])
            seedInitialDataIfNeeded(in: container)
            return container
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        // Task 3 solution: injects the model context into the whole view hierarchy via the environment.
        .modelContainer(sharedModelContainer)
    }
}

// Task 3 solution: seed mock data once so it persists across cold restarts instead of duplicating.
@MainActor
private func seedInitialDataIfNeeded(in container: ModelContainer) {
    let context = container.mainContext
    let existingCount = (try? context.fetchCount(FetchDescriptor<User>())) ?? 0
    guard existingCount == 0 else { return }

    for user in User.mockUsers {
        context.insert(user)
    }
    try? context.save()
}
