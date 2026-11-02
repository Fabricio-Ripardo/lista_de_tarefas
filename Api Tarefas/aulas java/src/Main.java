import java.util.Scanner;

public class Main {
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        double valorPrazo = 0;
        double totalAvista = 0;

        for (int i = 1; i <= 15; i++){
            char codigo = scanner.next().charAt(0);
            double valor = scanner.nextDouble();

            if (codigo == 'V'){
                totalAvista += valor;
            } else if (codigo == 'P'){
                valorPrazo += valor;
            }
        }
        double totalCompras = totalAvista + valorPrazo;
        double primeiraPrestacao = valorPrazo / 3;

        System.out.println("Total a vista: " + totalAvista);
        System.out.println("Total a prazo: " + valorPrazo);
        System.out.println("Total de compras: " + totalCompras);
        System.out.println("Valor da primeira prestacao: " + primeiraPrestacao);
    }
}