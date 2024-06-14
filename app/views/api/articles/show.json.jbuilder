json.article do
    json.extract! @article, :id, :title, :body
    json.updatedAt @article.updated_in_words_with_year
    json.createdAt @article.created_in_words_with_year
    json.minRead @article.reading_time
    json.authorId @article.author.id
    json.photoUrl @article.photo.attached? ? @article.photo.url : nil
    json.clapIds @article.clap_ids
end

json.author do
    json.extract! @article.author, :id, :email, :name, :created_at, :updated_at
    json.photoUrl @article.author.photo.attached? ? @article.author.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
end

json.claps do
    @article.claps.each do |clap|
        json.set! clap.id do
            json.extract! clap, :id, :clapper_id, :clappable_id, :clappable_type, :amount
        end
    end
end

json.clappers do
    @article.clappers.each do |clapper|
        json.set! clapper.id do
            json.extract! clapper, :id, :email, :name
            json.photoUrl clapper.photo.attached? ? clapper.photo.url : "https://centre-seeds.s3.amazonaws.com/users/demo.png"
        end
    end
end