import SwiftUI
import SwiftData

struct UserDetailView: View {
    // Task 4 solution: @Bindable lets edits to this SwiftData model persist directly.
    @Bindable var user: User
    @Environment(\.modelContext) private var modelContext
    @State private var newTaskTitle = ""

    var body: some View {
        List {
            Section("User Profile") {
                LabeledContent("Name", value: user.name)
                LabeledContent("Username", value: "@\(user.username)")
                LabeledContent("Email", value: user.email)
            }

            Section("Assigned Tasks (\(user.tasks.count))") {
                HStack {
                    TextField("New task title...", text: $newTaskTitle)
                    Button("Add") {
                        addTask()
                    }
                    .buttonStyle(.borderedProminent)
                    .disabled(newTaskTitle.trimmingCharacters(in: .whitespaces).isEmpty)
                }

                ForEach(user.tasks) { task in
                    HStack {
                        Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                            .foregroundColor(task.isCompleted ? .green : .gray)
                            // Task 4 solution: Update operation - toggling a SwiftData model
                            // property is automatically persisted via the model context.
                            .onTapGesture {
                                task.isCompleted.toggle()
                            }
                        Text(task.title)
                        Spacer()
                    }
                }
                // Task 4 solution: Delete operation - removes an individual UserTask.
                .onDelete(perform: deleteTasks)
            }
        }
        .navigationTitle(user.name)
        .navigationBarTitleDisplayMode(.inline)
    }

    // Task 4 solution: Create operation - inserts a new UserTask and appends it to the relationship.
    private func addTask() {
        let trimmed = newTaskTitle.trimmingCharacters(in: .whitespaces)
        guard !trimmed.isEmpty else { return }
        let newTask = UserTask(title: trimmed, owner: user)
        modelContext.insert(newTask)
        user.tasks.append(newTask)
        newTaskTitle = ""
    }

    private func deleteTasks(at offsets: IndexSet) {
        for index in offsets {
            modelContext.delete(user.tasks[index])
        }
    }
}

#Preview {
    NavigationStack {
        UserDetailView(user: User.mockUsers[0])
    }
}
