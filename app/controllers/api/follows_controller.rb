class Api::FollowsController < ApplicationController
    wrap_parameters include: Follow.attribute_names

    def create
        @follow = Follow.includes(:follower, :leader).new(follow_params)
        @follow.follower = current_user

        if @follow.save
            render 'api/follows/show'
        else
            errors = [*@follow.errors.full_messages, @follow.user_id]
            render json: { errors: errors }, status: :unprocessable_entity
        end
    end

    def destroy
        @follow = Follow.includes(:follower, :leader).find_by(id: params[:id])

        unless @follow
            render json: { errors: "The follow could not be found but may be available in the future."}, status: 404
        end

        if @follow.follower != current_user
            render json: { errors: "You are not the owner of this follow and do not have the necessary permissions to destroy to it." }, status: 403
        else
            if @follow.destroy
                render 'api/follows/show'
            else
                errors = [*@follow.errors.full_messages, @follow.user_id]
                render json: { errors: errors }, status: :unprocessable_entity
            end
        end
    end

    def follow_params
        params.require(:follow).permit(:follower_id, :user_id)
    end
end