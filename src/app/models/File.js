/* eslint-disable prettier/prettier */
import Sequelize, { Model } from 'sequelize';


class File extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            path: Sequelize.STRING,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    // eslint-disable-next-line no-template-curly-in-string
                    return `${process.env.APP_URL}/${this.path}`;
                }
            }
        }, {
            sequelize,
        });

        return this;
    }
}

export default File;