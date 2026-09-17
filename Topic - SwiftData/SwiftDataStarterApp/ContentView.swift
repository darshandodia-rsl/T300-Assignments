import SwiftUI
import SwiftData

struct ContentView: View {
    // Task 3 solution: model context injected from the environment, used below for the Create operation.
    @Environment(\.modelContext) private var modelContext
    @State private var searchText = ""
    @State private var showingAddUserSheet = false

    @State private var newName = ""
    @State private var newUsername = ""
    @State private var newEmail = ""

    var body: some View {
        TabView {
            // Tab 1: Users
            NavigationStack {
                UserListView(searchText: searchText)
                    .navigationTitle("Users")
                    .searchable(text: $searchText, prompt: "Search users...")
                    .toolbar {
                        ToolbarItem(placement: .topBarTrailing) {
                            Button {
                                showingAddUserSheet = true
                            } label: {
                                Image(systemName: "person.badge.plus")
                            }
                        }
                    }
                    .sheet(isPresented: $showingAddUserSheet) {
                        NavigationStack {
                            Form {
                                Section("User Info") {
                                    TextField("Full Name", text: $newName)
                                    TextField("Username", text: $newUsername)
                                    TextField("Email Address", text: $newEmail)
                                        .keyboardType(.emailAddress)
                                }
                            }
                            .navigationTitle("Add New User")
                            .navigationBarTitleDisplayMode(.inline)
                            .toolbar {
                                ToolbarItem(placement: .cancellationAction) {
                                    Button("Cancel") {
                                        showingAddUserSheet = false
                                    }
                                }
                                ToolbarItem(placement: .confirmationAction) {
                                    Button("Save") {
                                        addUser()
                                        showingAddUserSheet = false
                                    }
                                    .disabled(newName.isEmpty || newUsername.isEmpty)
                                }
                            }
                        }
                    }
            }
            .tabItem {
                Label("Users", systemImage: "person.3.fill")
            }

            // Tab 2: All Tasks
            AllTasksView()
                .tabItem {
                    Label("All Tasks", systemImage: "checklist")
                }
        }
    }

    // Task 4 solution: Create operation - inserts a new User into the model context.
    private func addUser() {
        let newUser = User(name: newName, username: newUsername, email: newEmail)
        modelContext.insert(newUser)
        newName = ""
        newUsername = ""
        newEmail = ""
    }
}

// Task 4 solution: replaces the in-memory user array with a live @Query, and rebuilds
// a type-safe #Predicate whenever the parent's search text changes (dynamic search filtering).
// Split into its own view because a @Query's predicate is fixed at init.
private struct UserListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var users: [User]

    init(searchText: String) {
        // Task 4 solution: type-safe filtering by name or username using #Predicate.
        let predicate = #Predicate<User> { user in
            searchText.isEmpty
                || user.name.localizedStandardContains(searchText)
                || user.username.localizedStandardContains(searchText)
        }
        _users = Query(filter: predicate, sort: [SortDescriptor(\User.name)])
    }

    var body: some View {
        List {
            ForEach(users) { user in
                NavigationLink {
                    UserDetailView(user: user)
                } label: {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(user.name)
                            .font(.headline)
                        HStack {
                            Text("@\(user.username)")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                            Spacer()
                            Text("\(user.tasks.count) tasks")
                                .font(.caption)
                                .foregroundStyle(.blue)
                        }
                    }
                }
            }
            .onDelete(perform: deleteUsers)
        }
    }

    // Task 4 solution: Delete operation - removes User(s) from the model context
    // (cascades to their tasks per the Task 2 relationship rule).
    private func deleteUsers(at offsets: IndexSet) {
        for index in offsets {
            modelContext.delete(users[index])
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: User.self, inMemory: true)
}
