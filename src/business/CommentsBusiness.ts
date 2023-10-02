import { CommentsDatabase } from "../database/CommentsDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comments/createComment.dto";
import { GetCommentsInputDTO, GetCommentsOutoutDTO } from "../dtos/comments/getComments.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comments, CommentsDB } from "../models/Comment";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutoutDTO> => {
        const {postId, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const commentsDBWithCreatorNickname = await this.commentsDatabase.getComments(postId)

        const comments = commentsDBWithCreatorNickname.map((commentDB) => {
            const comment = new Comments(
                commentDB.id,
                commentDB.id_post,
                commentDB.creator_id,
                commentDB.creator_nickname,
                commentDB.message,
                commentDB.likes,
                commentDB.dislikes,
                commentDB.created_at,
                commentDB.updated_at
            )

            return comment.CommentsToBusinessModel()
        })

        const output: GetCommentsOutoutDTO = comments

        return output

    }


    public createComment = async (input: CreateCommentInputDTO): Promise <CreateCommentOutputDTO> => {
        const {idPost, message, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new UnauthorizedError()
        }

        const {id: creatorId, nickname: creatorNickname} = payload;

        const id = this.idGenerator.generate()

        const comment = new Comments(
            id,
            idPost,
            creatorId,
            creatorNickname,
            message,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        await this.commentsDatabase.insertComment(comment.CommentsToDBModel())

        const output: CreateCommentOutputDTO = undefined

        return output
        
    }
}