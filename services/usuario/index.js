var usuarioService = {};

usuarioService.crearUsuario = require("services/usuario/crearUsuario.service.js");
usuarioService.buscarUsuarioPorEmail = require("services/usuario/buscarUsuarioPorEmail.service.js");
usuarioService.crearUsuarioDeGoogle = require("services/usuario/crearUsuarioDeGoogle.service.js");
usuarioService.crearUsuarioConContrasena = require("services/usuario/crearUsuarioConContrasena.service.js");

module.exports = usuarioService;