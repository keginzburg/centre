json.article do
    json.extract! @article, :id, :title, :body
    json.updatedAt @article.updated_in_words_with_year
    json.createdAt @article.created_in_words_with_year
    json.minRead @article.reading_time
    json.authorId @article.author.id
    json.photoUrl @article.photo.attached? ? @article.photo.url : nil
end

json.author do
    json.extract! @article.author, :id, :email, :name, :created_at, :updated_at
    json.photoUrl @article.author.photo.attached? ? @article.author.photo.url : nil
end