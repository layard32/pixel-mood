class EntriesController < ApplicationController
    # GET /entries
    def index
        @entries = Entry.all
        render json: @entries
    end

    # POST /entries
    def create
        @entry = Entry.new(entry_params)
        if @entry.save
            render json: @entry, status: :created
        else
            render json: @entry.errors, status: :unprocessable_entity
        end
    end

    # PATCH /entries/:id
    def update
        @entry = Entry.find(params[:id])
        if @entry.update(entry_params)
            render json: @entry
        else
            render json: @entry.errors, status: :unprocessable_entity
        end
    end


    private

    def entry_params
        params.require(:entry).permit(:content, :mood_score)
    end

end
