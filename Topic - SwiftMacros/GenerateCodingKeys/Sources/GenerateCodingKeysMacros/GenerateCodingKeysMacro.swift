import SwiftCompilerPlugin
import SwiftSyntax
import SwiftSyntaxBuilder
import SwiftSyntaxMacros

public struct GenerateCodingKeysMacro: MemberMacro {

    public static func expansion(
        of node: AttributeSyntax,
        providingMembersOf declaration: some DeclGroupSyntax,
        conformingTo protocols: [TypeSyntax],
        in context: some MacroExpansionContext
    ) throws -> [DeclSyntax] {

        // Get all property names from the type
        var propertyNames: [String] = []

        for member in declaration.memberBlock.members {
            if let variable = member.decl.as(VariableDeclSyntax.self) {
                for binding in variable.bindings {
                    if let name = binding.pattern.as(IdentifierPatternSyntax.self) {
                        propertyNames.append(name.identifier.text)
                    }
                }
            }
        }

        // Generate CodingKey cases
        let caseLines = propertyNames.map { name in
            let snakeCaseName = camelCaseToSnakeCase(name)

            if snakeCaseName == name {
                return "case \(name)"
            } else {
                return "case \(name) = \"\(snakeCaseName)\""
            }
        }

        let enumBody = caseLines.joined(separator: "\n    ")

        let codingKeysDecl: DeclSyntax = """
        enum CodingKeys: String, CodingKey {
            \(raw: enumBody)
        }
        """

        return [codingKeysDecl]
    }
}

func camelCaseToSnakeCase(_ text: String) -> String {
    var result = ""

    for character in text {
        if character.isUppercase {
            result.append("_")
            result.append(contentsOf: character.lowercased())
        } else {
            result.append(character)
        }
    }

    return result
}

@main
struct GenerateCodingKeysPlugin: CompilerPlugin {

    let providingMacros: [Macro.Type] = [
        GenerateCodingKeysMacro.self
    ]
}
