import Foundation
import SwiftData

// Task 1 solution: User is a persistent SwiftData entity.
@Model
final class User {
    // Task 1 solution: .unique enforces a database-level uniqueness constraint on the identifier.
    @Attribute(.unique) var id: UUID
    var name: String
    var username: String
    var email: String

    // Task 2 solution: 1-to-many relationship to UserTask with cascade delete —
    // deleting a User automatically deletes all of its UserTasks.
    @Relationship(deleteRule: .cascade, inverse: \UserTask.owner)
    var tasks: [UserTask] = []

    init(id: UUID = UUID(), name: String, username: String, email: String, tasks: [UserTask] = []) {
        self.id = id
        self.name = name
        self.username = username
        self.email = email
        self.tasks = tasks
    }
}

// Task 1 solution: UserTask is a persistent SwiftData entity.
@Model
final class UserTask {
    @Attribute(.unique) var id: UUID
    var title: String
    var isCompleted: Bool
    // Task 2 solution: inverse side of the User <-> UserTask relationship.
    var owner: User?

    init(id: UUID = UUID(), title: String, isCompleted: Bool = false, owner: User? = nil) {
        self.id = id
        self.title = title
        self.isCompleted = isCompleted
        self.owner = owner
    }
}

extension User {
    static let mockUsers: [User] = [
        User(
            name: "Alex Rivera",
            username: "arivera",
            email: "alex.rivera@example.com",
            tasks: [
                UserTask(title: "Complete SwiftData schema definition", isCompleted: false),
                UserTask(title: "Set up ModelContainer in App Shell", isCompleted: true)
            ]
        ),
        User(
            name: "Jordan Lee",
            username: "jlee",
            email: "jordan.lee@example.com",
            tasks: [
                UserTask(title: "Implement #Predicate search filtering", isCompleted: false),
                UserTask(title: "Verify cascade deletion rules", isCompleted: false)
            ]
        )
    ]
}
