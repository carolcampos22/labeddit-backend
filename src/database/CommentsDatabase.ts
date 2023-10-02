import { CommentsDB, CommentsDBWithCreatorNickname } from "../models/Comment"
import { BaseDatabase } from "./BaseDatabase"
import { UserDatabase } from "./UserDatabase"

export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public insertComment = async (commentDB: CommentsDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }

    public getComments = async (idPost: string): Promise<CommentsDBWithCreatorNickname[]> => {
        
        const result = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                `${CommentsDatabase.TABLE_COMMENTS}.id`,
                `${CommentsDatabase.TABLE_COMMENTS}.id_post`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.message`,
                `${CommentsDatabase.TABLE_COMMENTS}.likes`,
                `${CommentsDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentsDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`

            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )

        return result as CommentsDBWithCreatorNickname[]
    }
}