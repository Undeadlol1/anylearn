import Boom from 'boom';

/**
 * TODO
 *
 * @param {string} redirectRoute // TODO
 * @returns
 */
export function mustLogin(req, res, next) {
    console.log('req.isAuthenticated: ', req.isAuthenticated);
    console.log('req.user.id: ', req.user.id);
    console.log('req.session: ', req.session);
    req.isAuthenticated() ? next() : res.boom.unauthorized('Please, log in to do this')
}