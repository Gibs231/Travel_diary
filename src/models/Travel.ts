    import { Model, DataTypes } from 'sequelize';
    import database from '../database/database';

    class Travel extends Model {
    public id?: number;
    public userId!: string; // email dari google
    public title!: string;
    public completed!: boolean;
    public description?: string;
    public imageUrl?: string; // jika ada gambar, bisa ditambahkan di sini
    public travelDate!: string;
    public rating?: string;
    }

    Travel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false // ganti true jika ada data public
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    travelDate: {
        type: DataTypes.DATEONLY,
        allowNull: false // atau true, tergantung apakah wajib diisi
    },
    rating: {
        type: DataTypes.STRING,
        allowNull: true // tanpa validasi, pengguna bisa isi bebas
        },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // jika ada gambar, bisa ditambahkan di sini
    }
    }, {
    sequelize: database,
    tableName: 'Travel'
    });

    Travel.sync()
    .then(() => console.log('Travel model synced successfully.'))
    .catch((error: any) => console.error(`Error syncing Travel model: ${error.message}`));

    export default Travel;
