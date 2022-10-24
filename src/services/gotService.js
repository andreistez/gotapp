export default class gotService {
	constructor(){
		this._apiBase = 'https://anapioficeandfire.com/api'
	}

	async getResource( url ){
		const res = await fetch( `${ this._apiBase + url }` )

		if( ! res.ok ) throw new Error( `Couldn't fetch ${ url }, received ${ res.status }` )

		return await res.json()
	}

	getAllCharacters = async ( page = 1, size = 10 ) => {
		const characters = await this.getResource( `/characters?page=${ page }&pageSize=${ size }` )

		return characters.map( this._transformCharacter )
	}

	getCharacter = async id => {
		const character = await this.getResource( `/characters/${ id }` )

		return this._transformCharacter( character )
	}

	getAllHouses = () => {
		return this.getResource( '/houses' )
	}

	getHouse = id => {
		return this.getResource( `/houses/${ id }` )
	}

	getAllBooks = () => {
		return this.getResource( '/books' )
	}

	getBook = id => {
		return this.getResource( `/books/${ id }` )
	}

	_transformCharacter = character => {
		return {
			name	: character.name || '---',
			gender	: character.gender || '---',
			born	: character.born || '---',
			died	: character.died || '---',
			culture	: character.culture || '---'
		}
	}

	_transformHouse = house => {
		return {
			name			: house.name || '---',
			region			: house.region || '---',
			words			: house.words || '---',
			titles			: house.titles || '---',
			overlord		: house.overlord || '---',
			ancestralWeapons: house.ancestralWeapons || '---'
		}
	}

	_transformBook = book => {
		return {
			name			: book.name || '---',
			numberOfPages	: book.numberOfPages || '---',
			publisher		: book.publisher || '---',
			released		: book.released || '---'
		}
	}
}