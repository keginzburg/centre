class Api::ClapsController < ApplicationController
    wrap_parameters include: Clap.attribute_names

    def create
        @clap = Clap.new(clap_params)
        @clap.clapper = current_user

        if @clap.save
            render 'api/claps/show'
        else
            render json: { errors: @clap.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @clap = Clap.find_by(id: params[:id])

        unless @clap
            render json: { errors: "The applause could not be found but may be available in the future."}, status: 404
        end

        if @clap.clapper != current_user
            render json: { errors: "You are not the owner of this applause and do not have the necessary permissions to add to it." }, status: 403
        else
            if @clap.update(amount: @clap.amount + 1)
                render 'api/claps/show'
            else
                render json: { errors: @clap.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def destroy
        @clap = Clap.find_by(id: params[:id])

        unless @clap
            render json: { errors: "The applause could not be found but may be available in the future."}, status: 404
        end

        if @clap.clapper != current_user
            render json: { errors: "You are not the owner of this applause and do not have the necessary permissions to destroy to it." }, status: 403
        else
            if @clap.destroy
                render 'api/claps/show'
            else
                render json: { errors: @clap.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def clap_params
        params.require(:clap).permit(:clappable_type, :clappable_id, :amount)
    end
end