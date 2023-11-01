import { TokenPayload, USER_ROLES } from '../../src/models/User'

export class TokenManagerMock {
    public createToken = (payload: TokenPayload): string => {
        if (payload.id === "id-mock") {
            return "token-mock"
        } else if (payload.id === "id-mock-fulano") {
            return "token-mock-fulano"
        } else {
            return "token-mock-beltrano"
        }
    }

    public getPayload = (token: string): TokenPayload | null => {
        if (token === "token-mock-fulano") {
            return {
                id: "id-mock-fulano",
                nickname: "Fulano",
                role: USER_ROLES.NORMAL
            }
        } else if (token === "token-mock-beltrano") {
            return {
                id: "id-mock-beltrano",
                nickname: "Beltrano",
                role: USER_ROLES.ADMIN
            }
        } else {
            return null
        }
    }
}