json.clap do
    json.extract! @clap, :id, :clappable_type, :clappable_id, :clapper_id, :amount
end

if @clap.clappable_type == "Article"
    json.article do
        json.extract! @clap.clappable, :id, :title, :body
        json.updatedAt @clap.clappable.updated_in_words_with_year
        json.createdAt @clap.clappable.created_in_words_with_year
        json.minRead @clap.clappable.reading_time
        json.authorId @clap.clappable.author.id
        json.photoUrl @clap.clappable.photo.attached? ? @clap.clappable.photo.url : nil
        json.clapIds @clap.clappable.clap_ids
    end
end

json.clapper do
    json.extract! @clap.clapper, :id, :email, :name
    json.photoUrl @clap.clapper.photo.attached? ? @clap.clapper.photo.url : nil
end